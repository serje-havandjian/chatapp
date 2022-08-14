json.extract! conversation, :id, :title, :user_a_id, :user_b_id, :created_at, :updated_at
json.url conversation_url(conversation, format: :json)
