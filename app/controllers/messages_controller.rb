class MessagesController < ApplicationController


    def index
        messages = Message.all
        render json: messages, status: :ok
    end

    def show
        oneMessage = Message.find(params[:id])
        render json: oneMessage, include: "*.*", status: :ok
    end

    def create
        message = Message.create(message_params)
        render json: message, status: :created
    end




    private

    def message_params
        params.permit(:content, :user_id, :conversation_id)
    end

end
