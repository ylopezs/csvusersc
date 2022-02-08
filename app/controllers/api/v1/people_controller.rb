require 'csv'

class Api::V1::PeopleController < ApplicationController
    skip_before_action :verify_authenticity_token

    #GET /people
    #GET /people.json
    def index
        @people = Person.limit(10).offset(params[:offset])
        render json: @people
    end

    #POST /load
    def load
        file = params[:file]
        CSV.foreach(file.path, headers: true) do |row|
            !row['Affiliations'].present? ? next : nil
            @person = Person.new
            @person.name= row['Name'].titleize
            @person.species= row['Species']
            @person.gender= row['Gender']
            @person.weapon= row['Weapon']
            @person.vehicle= row['Vehicle']
            @person.locations= locations(row['Location'].titleize)
            @person.affiliations= affiliations(row['Affiliations'])
            @person.save
        end
        head :no_content
    end

    private
    #Check if the locations have been already created
    def locations(locations_string)
        location_names = locations_string.split(", ")
        locations_saved = Array.new
        location_names.each  do |name|
            location = Location.find_by_name(name)
            location.present? ? locations_saved.push(location) : locations_saved.push(Location.create(name: name))
        end
        locations_saved
    end

    #Check if the affiliations have been already created
    def affiliations(affiliations_string)
        affiliations_names = affiliations_string.split(", ")
        affiliations_saved = Array.new
        affiliations_names.each  do |name|

            affiliation = Affiliation.find_by_name(name)
            affiliation.present? ? affiliations_saved.push(affiliation) : affiliations_saved.push(Affiliation.create(name: name))
        end
        puts affiliations_saved
        affiliations_saved
    end
end
