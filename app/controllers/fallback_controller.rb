class FallbackController < ActionController::Base


    def index
      # React app index page
      render file: 'chatroom/public/index.html'
    end
  
  end
  