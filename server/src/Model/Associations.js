User.hasMany(TeamMember, { foreignKey: 'userId' });
TeamMember.belongsTo(User, { foreignKey: 'userId' });

Project.hasMany(TeamMember, { foreignKey: 'projectId' });
TeamMember.belongsTo(Project, { foreignKey: 'projectId' });
