import { QueryInterface, DataTypes } from 'sequelize';

export default {
  /**
   # ToDo: Create a migration that creates all tables for the following user stories

   For an example on how a UI for an api using this might look like, please try to book a show at https://in.bookmyshow.com/.
   To not introduce additional complexity, please consider only one cinema.

   Please list the tables that you would create including keys, foreign keys and attributes that are required by the user stories.

   - movies -> id, showroomId (foreign key for the showroom), isScreening, name, screeningStartTime, screeningEndTime, bookedOut, pricePerSeat
   - showrooms -> id, name, seatsAvailable
   - seats -> id, showroomId (foreign key for the showroom), name, code, bookedOut
   - seatTypes -> id, type, percentagePremium
   - bookings -> id, movieId, seatId, showroomId, userId, active
   - users -> id, email, name, phoneNumber
   - roles -> id, roleType

   ## User Stories

   **Movie exploration**
   * As a user I want to see which films can be watched and at what times
   * As a user I want to only see the shows which are not booked out

   **Show administration**
   * As a cinema owner I want to run different films at different times
   * As a cinema owner I want to run multiple films at the same time in different showrooms

   **Pricing**
   * As a cinema owner I want to get paid differently per show
   * As a cinema owner I want to give different seat types a percentage premium, for example 50 % more for vip seat

   **Seating**
   * As a user I want to book a seat
   * As a user I want to book a vip seat/couple seat/super vip/whatever
   * As a user I want to see which seats are still available
   * As a user I want to know where I'm sitting on my ticket
   * As a cinema owner I don't want to configure the seating for every show
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.createTable('roles', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      roleType: { type: DataTypes.ENUM('admin', 'user'), allowNull: false, defaultValue: 'user' },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    });

    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      roleId: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'roles',
          },
          key: 'id',
        },
      },
      email: { type: DataTypes.STRING(50), allowNull: false, unique: true },
      name: { type: DataTypes.TEXT, allowNull: false },
      phoneNumber: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    });

    await queryInterface.createTable('showrooms', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: DataTypes.TEXT },
      seatsAvailable: { type: DataTypes.BOOLEAN },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    });

    await queryInterface.createTable('movies', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: DataTypes.TEXT, allowNull: false },
      screeningStartTime: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
      screeningEndTime: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
      bookedOut: { type: DataTypes.BOOLEAN },
      isScreening: { type: DataTypes.BOOLEAN },
      showroomId: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'showrooms',
          },
          key: 'id',
        },
      },
      pricePerSeat: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    });

    await queryInterface.createTable('seatTypes', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      type: { type: DataTypes.TEXT, allowNull: false },
      percentagePremium: { type: DataTypes.INTEGER, defaultValue: 0, allowNull: false },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    });

    await queryInterface.createTable('seats', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: DataTypes.TEXT },
      code: { type: DataTypes.TEXT, allowNull: false }, // seat number and row
      bookedOut: { type: DataTypes.BOOLEAN },
      showroomId: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'showrooms',
          },
          key: 'id',
        },
      },
      seatTypeId: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'seatTypes',
          },
          key: 'id',
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    });

    await queryInterface.createTable('bookings', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      movieId: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'movies',
          },
          key: 'id',
        },
      },
      seatId: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'seats',
          },
          key: 'id',
        },
      },
      showroomId: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'showrooms',
          },
          key: 'id',
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'users',
          },
          key: 'id',
        },
      },
      active: { type: DataTypes.BOOLEAN },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    });
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  down: (queryInterface: QueryInterface) => {
    // do nothing
  },
};
