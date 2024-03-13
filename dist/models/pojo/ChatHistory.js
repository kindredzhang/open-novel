import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/DatabaseConfig';
class ChatHistory extends Model {
}
ChatHistory.init({
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    role: {
        type: DataTypes.STRING(32),
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    novel_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    content_type: {
        type: DataTypes.SMALLINT,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'chat_history',
    timestamps: false,
});
export default ChatHistory;
