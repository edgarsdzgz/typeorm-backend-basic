import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from "typeorm"
import { Client } from "./Client";

export enum TransactionTypes {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw'
}

@Entity('transactions') // inside entity -- we name the table
export class Transaction extends BaseEntity {  // extending BaseEntity allows for the CRUD operations
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
      type: "enum",
      enum: TransactionTypes,
    })
    type: string;

    @Column({
      type: "numeric",
    })
    amount: number;

    @ManyToOne(() => Client, (client) => client.transactions, {onDelete: "CASCADE"})
    @JoinColumn({ name: 'client_id' })
    client: Client;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
