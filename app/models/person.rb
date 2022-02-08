class Person < ApplicationRecord
    has_and_belongs_to_many :affiliations
    has_and_belongs_to_many :locations
    validates :name, presence: true
    validates :species, presence: true
    validates :gender, presence: true
    #validates :locations, presence: true
    #validates :affilations, presence: true
end
