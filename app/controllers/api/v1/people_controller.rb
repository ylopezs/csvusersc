require 'csv'

class Api::V1::PeopleController < ApplicationController
    skip_before_action :verify_authenticity_token

    #GET /people
    #GET /people.json
    def index
        @people = Person.all
        render json: @people
    end

    #POST /load
    def load
        puts "pego.........."
        file = params[:file]
        puts file.path
        CSV.foreach(file.path, headers: true) do |row|
            @person = Person.new
            @person.name= row['Name']
            @person.species= row['Species']
            @person.gender= row['Gender']
            @person.weapon= row['Weapon']
            @person.vechicle= row['Vehicle']
        end
        @people = Person.all
        render json: @people
    end
end
