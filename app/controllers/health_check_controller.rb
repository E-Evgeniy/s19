class HealthCheckController < ApplicationController
    def up
      head :ok
    end
  end