class CreatePeople < ActiveRecord::Migration[5.2]
  def change
    create_table :people do |t|
      t.string :name
      t.string :species
      t.string :gender
      t.string :weapon
      t.string :vehicle

      t.timestamps
    end

    create_table :locations do |t|
      t.string :name

      t.timestamps
    end

    create_table :locations_people, id: false do |t|
      t.belongs_to :person, index: true
      t.belongs_to :location, index: true

      t.timestamps
    end

    create_table :affiliations do |t|
      t.string :name

      t.timestamps
    end

    create_table :affiliations_people, id: false do |t|
      t.belongs_to :person, index: true
      t.belongs_to :affiliation, index: true

      t.timestamps
    end
  end
end
