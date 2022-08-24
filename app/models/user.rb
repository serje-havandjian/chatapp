class User < ApplicationRecord

    has_many :conversations, :class_name => :Conversation, :foreign_key => "user_a_id"
    has_many :messages

    has_secure_password

end
