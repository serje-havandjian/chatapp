class ApplicationController < ActionController::API

    include ActionController::Cookies

    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :render_invalid

    private

    def render_not_found(exception)
        render json: { error: "#{exception.model} not found" }, status: :not_found
    end

    def render_invalid(exception)
        render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
    end

    def current_user
        @current_user ||= session[:user_id] && User.find_by(id: session[:user_id])
      end
    
      def authorize
        render json: { errors: ["Not authorized"] }, status: :unauthorized unless current_user   
      end


end
 