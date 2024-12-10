import { DataTypes } from 'sequelize'
import database from '../../database.ts'
import { ApiModel, ApiModelProperty } from 'swagger-express-ts'

export interface ContactModel {
  id: number
  full_name: string
  phone: string
  email: string
}

const Contact = database.define(
  'contacts',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'contacts',
    modelName: 'Contact'
  }
)

export default Contact
