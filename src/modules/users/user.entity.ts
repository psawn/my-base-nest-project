import { hashPassword } from 'src/helpers/encrypt.helper';
import * as bcrypt from 'bcrypt';
import {
  Entity,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  BaseEntity,
  BeforeInsert,
} from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'password', nullable: true })
  password: string;

  @Column({ name: 'phone', nullable: true })
  phone: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;

  @Column({ name: 'role', default: null })
  role: string;

  @Column({ name: 'google_id', nullable: true })
  googleId: string;

  @Column({ name: 'facebook_id', nullable: true })
  facebookId: string;

  async validatePassword(password: string): Promise<boolean> {
    if (this.password && password && String(password).trim()) {
      return await bcrypt.compare(password, this.password);
    }
    return false;
  }

  // nếu không khởi tạo instance thì k trigger được before insert -> phèn
  // @BeforeInsert()
  // async hashPassword() {
  //   this.password = await hashPassword(this.password);
  // }
}
