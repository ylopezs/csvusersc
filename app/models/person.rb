require 'csv'

class Person < ApplicationRecord
    has_and_belongs_to_many :affilations
    has_and_belongs_to_many :locations

    def self.locations_to_string
        # locations_string = String.new
        # locations.each do |location|
        #     locations_string += location.name
        # end
        # locations_string
        puts "called"
    end

end
