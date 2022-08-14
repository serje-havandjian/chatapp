# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)


User.destroy_all
Conversation.destroy_all
Message.destroy_all

ryan = User.create(name: "Ryan", user_name: "ryanIsCool", email:"ryan@ryan.com")
serje = User.create(name: "Serje", user_name: "serjeIsCool", email:"serje@serje.com")

ryan_serje_conversation = Conversation.create(title: "Serje and Ryan chatroom", user_a_id:ryan.id, user_b_id:serje.id)

ryanTestMessage = Message.create(content: "test message from Ryan", user_id: ryan.id, conversation_id: ryan_serje_conversation.id)
serjeTestMessage = Message.create(content: "test message from Serje", user_id: serje.id, conversation_id: ryan_serje_conversation.id)


