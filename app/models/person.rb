class Person < ApplicationRecord
    has_and_belongs_to_many :affilations
    has_and_belongs_to_many :locations

    def self.load(file)
        CSV.foreach(file.path, headers: true) do |row|
            #TODO add logic for affilations and names
            Person.create! row.to_hash
        end
    end
end
