class User < ApplicationRecord

    has_many :created_conversation, :class_name => :Conversation, :foreign_key => "user_b_id"
    has_many :invited_conversation, :class_name => :Conversation, :foreign_key => "user_a_id"
  
    def conversations
            (created_conversation + invited_conversation).uniq  
    end


    has_many :messages

    has_secure_password

end
