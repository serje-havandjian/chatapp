class MessagesController < ApplicationController

    # ActionCable.server.broadcast("Conversation_channel", content: @message)

    def index
        messages = Message.all
        render json: messages, include: "*", status: :ok
    end

    def show
        oneMessage = Message.find(params[:id])
        render json: oneMessage, include: :user, status: :ok
    end

    def create
        # message = Message.create(message_params)
        # conversation = Conversation.find(message[:conversation_id])

  
        
        membership = current_user.conversations.find(params[:conversation_id])

       

        if membership
            message = current_user.messages.create!(message_params)
            ActionCable.server.broadcast(
                membership,
                MessageSerializer.new(message).as_json
            )  
            render json: message, status: :created
        else
            render json: {errors: ["Not Authorized"]}, status: :unauthorized
        end
    end


    private

    def message_params
        params.permit(:content, :user_id, :conversation_id, :read)
    end

end
