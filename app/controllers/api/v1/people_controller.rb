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
        file = params[:file]
        CSV.foreach(file.path, headers: true) do |row|
            !row['Affiliations'].present? ? next : nil
            @person = Person.new
            @person.name= row['Name']
            @person.species= row['Species']
            @person.gender= row['Gender']
            @person.weapon= row['Weapon']
            @person.vehicle= row['Vehicle']
            @person.locations= locations(row['Location'])
            @person.affiliations= row['Affiliations']
            @person.save
        end
        @people = Person.all
        render json: @people
    end

    private
    #Check if the locations have been already created
    def locations(locations)
        location_names = locations.split(", ")
        locations_saved = Array.new
        location_names.foreach  do |name|
            location = Location.find_by_name(name)
            location.present? ? locations_saved.push(location) : locations_saved.push(Location.new(name: name).save)
        end
        locations_saved
    end

    #Check if the affiliations have been already created
    def affiliations(affiliations)
        affiliations_names = affiliations.split(", ")
        affiliations_saved = Array.new
        affiliations_names.foreach  do |name|
            affiliation = Affilation.find_by_name(name)
            affiliation.present? ? affiliations_saved.push(affiliation) : affiliations_saved.push(Affilation.new(name: name).save)
        end
        affiliations_saved
    end
end
