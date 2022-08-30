class MessagesController < ApplicationController

    def index
        messages = Message.all
        render json: messages, status: :ok
    end

    def show
        oneMessage = Message.find(params[:id])
        render json: oneMessage, status: :ok
    end

    def create
        puts("starting log")
        puts(message_params, "message")
        puts("ending log")
        message = Message.create(message_params)
        puts("message created")
        puts(message)
        conversation = Conversation.find(message[:conversation_id])
        puts ("conversation with message found")
        puts(conversation)
        # ConversationChannel.broadcast_to(conversation, message)
        puts ("conversation being broadcated")

        render json: message, status: :created
    end


    private

    def message_params
        puts("logging message params")
        puts(params)
        params.permit(:content, :user_id, :conversation_id)
    end

end
