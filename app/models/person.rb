class Person < ApplicationRecord
    has_and_belongs_to_many :affiliations
    has_and_belongs_to_many :locations
    validates :name, presence: true
    validates :species, presence: true
    validates :gender, presence: true

    def locations_json
        {:locations => locations}.to_json    
    end

    def to_hash
        { 
            :id => id,
            :key => id,
            :name => name,
            :locations => locations,
            :species => species,
            :gender => gender,
            :affiliations => affiliations,
            :weapon => weapon,
            :vehicle => vehicle,     
        }
    end
end
