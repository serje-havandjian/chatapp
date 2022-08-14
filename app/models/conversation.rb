class Conversation < ApplicationRecord

    belongs_to :user_a
    belongs_to :user_b

    has_many :messages

end
