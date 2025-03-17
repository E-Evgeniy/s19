# frozen_string_literal: true

# Controller the API MpOrdersController
module Api
  module V1
    # MpOrdersController
    class MpOrdersController < BaseController
      #  Формируем JSON с данными о плане производства
      def index
        mpo = MpOrder.forming_mp_orders(MpOrder.where(status: false).order(priority: :asc))

        render(json: { mpo: })
      end

      # Тут в зависимости от того чье количество пришло правим сделанное количество
      def enter_made_volume
        case clac_need_structure(params)
        when 'matrix'
          matrix_change_need(params)
        when 'item'
          item_change_need(params)
        when 'matrix_tech_process'
          matrix_tech_process_change_need(params)
        else
          item_tech_process_change_need(params)
        end
        render(json: {})
      end

      # меняем приоритет у заказа
      def change_priority_object
        resp = MpOrder.change_priority_object(params['MpOrderId'], params['priority'])
        render(json: resp)
      end

      private

      # Что бы метод enter_made_volume не был слишком огромным, пришлось его раздробить
      # Если надо менять количество матрицы то исользуется метод matrix_change_need
      def matrix_change_need(params)
        object = MpMatrix.find(params['mp_matrix_id'])
        change_object_volume(object,
                             object.item_order_unit.matrix_volume,
                             object.volume,
                             params['made_volume'].to_i,
                             object.mp_matrix_tech_process)
      end

      # Если надо менять количество детали то исользуется метод item_change_need
      def item_change_need(params)
        object = MpItem.find(params['mp_item_id'])
        change_object_volume(object,
                             object.item_order_unit.casting_volume,
                             object.volume,
                             params['made_volume'].to_i,
                             object.mp_item_tech_process)
      end

      # Если надо менять количество item_tech_process то исользуется метод item_tech_process_change_need
      def item_tech_process_change_need(params)
        object = MpItemTechProcess.find(params['mp_item_tech_process_id'])
        change_object_volume(object,
                             object.mp_item.item_order_unit.casting_volume,
                             object.volume,
                             params['made_volume'].to_i,
                             [])
      end

      # Если надо менять количество matrix_tech_process то исользуется метод matrix_tech_process_change_need
      def matrix_tech_process_change_need(params)
        object = MpMatrixTechProcess.find(params['mp_matrix_tech_process_id'])
        change_object_volume(object,
                             object.mp_matrix.item_order_unit.matrix_volume,
                             object.volume,
                             params['made_volume'].to_i,
                             [])
      end

      # Тут определяем объект, количество которого надо править
      def clac_need_structure(params)
        return 'matrix' if params['mp_matrix_id'] != 'null'
        return 'item' if params['mp_item_id'] != 'null'
        return 'matrix_tech_process' if params['mp_matrix_tech_process_id'] != 'null'
        return 'item_tech_process' if params['mp_item_tech_process_id'] != 'null'
      end

      # Метод для правки количество нужного объекта
      def change_object_volume(object, volume_need, volume_finished, volume_made, tech_processes)
        return if volume_made == '0'

        object.volume = volume_finished + check_made_volume(volume_need, volume_finished, volume_made)

        return unless object.save
        return if tech_processes.empty?

        recalculation_tech_proc(tech_processes, volume_need, object.volume)
      end

      # Метод для корректного определения присланного сделанного количества объекта
      # (volume_need - необходимое изначально количество, volume_finished - уже готовое, volume_made - сделанное вот только что)
      def check_made_volume(volume_need, volume_finished, volume_made)
        if volume_need >= volume_finished + volume_made
          volume_made
        else
          volume_need - volume_finished
        end
      end

      # Теперь правим входящие в исходный объект сущности, проще говоря тех процесса
      def recalculation_tech_proc(mp_tech_processes, volume_need, volume_finished)
        mp_tech_processes.each do |mp_tp|
          next if mp_tp.volume >= volume_finished

          volume_made = volume_finished - mp_tp.volume
          mp_tp.volume = mp_tp.volume + check_made_volume(volume_need, mp_tp.volume, volume_made)
          mp_tp.save
        end
      end
    end
  end
end
