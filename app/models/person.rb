class Person < ApplicationRecord
    has_and_belongs_to_many :affilations
    has_and_belongs_to_many :locations
end
