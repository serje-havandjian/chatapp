class SessionsController < ApplicationController

    def create
        user = User.find_by(username: params[:username])
        if user&.authenticate(params[:password])
            puts "CREATE SESSION"
            cookies[:hello] = "world"
            puts cookies[:hello] 
            session[:user_id] = user.id
            cookies["_session"] = user.id
            render json: user, status: :created
        else
            render json: { error: "Invalid username or password" }, status: :unauthorized
        end
    end

    def destroy
        session.delete :user_id
        head :no_content
    end

end
