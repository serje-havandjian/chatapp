class ConversationChannel < ApplicationCable::Channel
  def subscribed
    stream_from params[:room]
    puts "*******"
    puts params[:room]
  end

  def receive(payload)
    message = current_user.messages.create(
      content: payload["message"]["content"],
      conversation_id: payload["message"]["conversation_id"]
    )
    ActionCable.server.broadcast( params[:room], MessageSerializer.new(message).as_json )
  end

  def unsubscribed
    stop_stream_from params[:room]
    # Any cleanup needed when channel is unsubscribed
  end
end
