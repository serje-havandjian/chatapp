class FallbackController < ActionController::Base


    def index
      # React app index page
      render template: 'public/index.html'
    end
  
  end
  