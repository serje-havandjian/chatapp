class FallbackController < ActionController::Base


  def index
    # React app index page
    render file: 'public//build/index.html'
  end

end
