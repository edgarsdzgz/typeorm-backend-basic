import {
  Entity,
  Column,
  ManyToMany,
  JoinTable
} from "typeorm"
import { AbstractPerson } from "./AbstractPerson";
import { Client } from "./Client";

@Entity('bankers') // inside entity -- we name the table
export class Banker extends AbstractPerson {  // extending BaseEntity allows for the CRUD operations
    @Column({
      unique: true,
      length: 10,
    })
    employee_number: string;

    @ManyToMany(() => Client, {
      eager: true,
      cascade: true,
    })
    @JoinTable({
      name: "bankers_clients",
      joinColumn: {
        name: "banker_id",
        referencedColumnName: "id",
      },
      inverseJoinColumn: {
        name: 'client_id',
        referencedColumnName: 'id',
      },
    })
    clients: Client[]
}
