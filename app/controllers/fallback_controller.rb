class FallbackController < ActionController::Base


    def index
      # React app index page
      render file: 'chatroom/build/index.html'
    end
  
  end
  