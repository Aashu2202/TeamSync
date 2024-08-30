const TeamMember = sequelize.define('TeamMember', {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    projectId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Projects',
        key: 'id',
      },
    },
    role: {
      type: DataTypes.ENUM('admin', 'member'),
      allowNull: false,
    },
    joinedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  });
  