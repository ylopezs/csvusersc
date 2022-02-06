class Api::V1::PeopleController < ApplicationController

    #GET /people_id
    #GET /people.json
    def index
        @people = Person.all
        render json: @people
    end

    def load
        Person.load(params[:file])
        @people = Person.all
        render json: @people
    end
end
