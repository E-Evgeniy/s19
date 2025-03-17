# frozen_string_literal: true

# Controller the react root app
class ReactController < ApplicationController
  # Returns the react root app
  before_action :authenticate_user!

  def home
    render "pages/react_app"
  end
end
