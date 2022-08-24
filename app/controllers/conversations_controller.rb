class ConversationsController < ApplicationController

    def index
        conversations = Conversation.all
        render json: conversations, status: :ok
    end

    def show
        oneConversation = Conversation.find(params[:id])
        render json: oneConversation, include: :messages, status: :ok
    end

    def create
        conversation = Conversation.create(conversation_params)
        render json: conversation, status: :created
    end

    private
    def conversation_params
        params.permit(:title, :user_a_id, :user_b_id)
    end

end
