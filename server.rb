require 'webrick'
module WEBrick
  module HTTPServlet
    FileHandler.add_handler('rb', CGIHandler)
  end
end
server = WEBrick::HTTPServer.new({
  :DocumentRoot => '.',
  :CGIInterpreter => WEBrick::HTTPServlet::CGIHandler::Ruby,
  :Port => '8080',
})
['INT', 'TERM'].each {|signal|
  Signal.trap(signal){ server.shutdown }
}

server.mount_proc('/api/push/register') do |request, response|
  p 'routing ok'
  p request.query
end

server.start

# WEBrick::HTTPServlet::FileHandler.add_handler("erb", WEBrick::HTTPServlet::ERBHandler)
# s = WEBrick::HTTPServer.new(config)
# s.config[:MimeTypes]["erb"] = "text/html"
# s.mount_proc("/hello2") { |req, res| 
#   p req.query 
#   name = req.query["name"]
#   template = ERB.new( File.read('hello2.erb') )
#   res.body << template.result( binding )
# }
