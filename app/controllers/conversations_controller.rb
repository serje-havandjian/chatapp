class ConversationsController < ApplicationController

    def index
        user = User.find(session[:user_id])
        conversations = user.conversations
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

    def destroy 
        conversation = Conversation.find(params[:id])
        conversation.destroy
        head :no_content
    end

    private
    def conversation_params
        params.permit(:title, :user_a_id, :user_b_id)
    end

end
