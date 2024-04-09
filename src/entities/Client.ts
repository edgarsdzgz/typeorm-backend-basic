import {
  Entity,
  Column,
  OneToMany,
  ManyToMany
} from "typeorm"
import { AbstractPerson } from "./AbstractPerson";
import { Transaction } from "./Transaction";
import { Banker } from "./Banker";

@Entity('clients') // inside entity -- we name the table
export class Client extends AbstractPerson {  // extending BaseEntity allows for the CRUD operations
    @Column({
      unique: true,
      length: 10,
    })
    card_number: string;

    @Column({
      type: "numeric",
    })
    balance: number;

    @Column({
      default: true,
      name: "active",
    })
    is_active: boolean;

    @Column({
      type: "simple-json",
      nullable: true,
    })
    additional_info: {
      age: number,
      address: string,
      city: string,
      state: string,
    }

    @Column({
      type: "simple-array",
      default: [],
    })
    family_members: string[]

    @OneToMany(() => Transaction, (transaction) => transaction.client)
    transactions: Transaction[];

    @ManyToMany(() => Banker)
    bankers: Banker[];
}
