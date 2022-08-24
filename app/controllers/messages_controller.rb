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



#   create_table "messages", force: :cascade do |t|
#     t.string "content"
#     t.integer "user_id"
#     t.integer "conversation_id"
#     t.datetime "created_at", null: false
#     t.datetime "updated_at", null: false
#   end

    private

    def message_params
        params.permit(:content, :user_id, :conversation_id)
    end

end
