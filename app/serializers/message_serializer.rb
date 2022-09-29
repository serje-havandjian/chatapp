class MessageSerializer < ActiveModel::Serializer
  attributes :id, :content, :user_id, :conversation_id, :user
  
  belongs_to :user
  belongs_to :conversation

end
