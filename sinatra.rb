# http://localhost:4567/
require 'bundler/setup'
Bundler.require
require 'sinatra'
require 'sinatra/reloader'

get '/' do
  erb :index
end