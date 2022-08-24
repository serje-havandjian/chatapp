class ConversationSerializer < ActiveModel::Serializer
  attributes :id, :title, :user_a_id, :user_b_id

    has_many :messages

    belongs_to :user_a, :class_name => "User", :foreign_key => "user_a_id"
    belongs_to :user_b, :class_name => "User", :foreign_key => "user_b_id"


end
