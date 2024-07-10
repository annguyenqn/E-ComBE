import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { RoleType } from 'src/common/constants';
// import { UserEntity } from '@src/modules/user/entities/user.entity';
import { Repository } from 'typeorm/repository/Repository';
import { CategoryEntity } from '@src/modules/product/entities/category.entity';
import { Gender } from '@src/common/constants/gender';
import { ProductEntity } from '@src/modules/product/entities/product.entity';

@Injectable()
export class SeedService {
  constructor(
    // @InjectRepository(UserEntity)
    // private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async seed(): Promise<void> {
    await Promise.all([
      //   this.seedCategories(),
      // this.seedAdmin(), this.seedUsers()
      this.seedProducts(),
    ]);
  }

  //   private async seedAdmin(): Promise<void> {
  //     const EMAIL = 'admin@gmail.com';
  //     const PASSWORD = 'Hello@123';
  //     const admin = await this.userRepository.findOneBy({ email: EMAIL });
  //     if (!admin) {
  //       await this.userRepository.save(
  //         this.userRepository.create({
  //           email: EMAIL,
  //           password: PASSWORD,
  //           role: RoleType.ADMIN,
  //         }),
  //       );
  //     }
  //   }

  //   private async seedUsers(): Promise<void> {
  //     const usersData = [
  //       {
  //         firstName: 'John',
  //         lastName: 'Doe',
  //         email: 'john.doe@gmail.com',
  //         password: 'Password@123',
  //         phone: '123456789',
  //         role: RoleType.USER,
  //       },
  //       {
  //         firstName: 'Jane',
  //         lastName: 'Smith',
  //         email: 'jane.smith@gmail.com',
  //         password: 'Password@123',
  //         phone: '987654321',
  //         role: RoleType.USER,
  //       },
  //     ];

  //     for (const userData of usersData) {
  //       // eslint-disable-next-line no-await-in-loop
  //       const user = await this.userRepository.findOneBy({
  //         email: userData.email,
  //       });
  //       if (!user) {
  //         // eslint-disable-next-line no-await-in-loop
  //         await this.userRepository.save(this.userRepository.create(userData));
  //       }
  //     }
  //   }

  //   private async seedCategories(): Promise<void> {
  //     const categoriesData = [
  //       {
  //         name: 'Clothing',
  //         description: 'Various types of clothing items',
  //         children: [
  //           { name: 'T-Shirts', description: 'Casual and comfortable T-shirts' },
  //           { name: 'Shirts', description: 'Formal and casual shirts' },
  //           { name: 'Hoodies', description: 'Warm and cozy hoodies' },
  //         ],
  //       },
  //       {
  //         name: 'Pants',
  //         description: 'Different styles of pants',
  //         children: [
  //           { name: 'Jeans', description: 'Durable and stylish jeans' },
  //           {
  //             name: 'Shorts',
  //             description: 'Comfortable shorts for warm weather',
  //           },
  //         ],
  //       },
  //       {
  //         name: 'Shoes',
  //         description: 'Various types of footwear',
  //         children: [
  //           {
  //             name: 'High-top Shoes',
  //             description: 'High-top shoes for better ankle support',
  //           },
  //           {
  //             name: 'Low-top Shoes',
  //             description: 'Low-top shoes for a casual look',
  //           },
  //           {
  //             name: 'Leather Shoes',
  //             description: 'Formal and durable leather shoes',
  //           },
  //           {
  //             name: 'Sneakers',
  //             description: 'Comfortable and versatile sneakers',
  //           },
  //         ],
  //       },
  //       {
  //         name: 'Jewelry',
  //         description: 'Different kinds of jewelry items',
  //         children: [
  //           { name: 'Necklaces', description: 'Elegant and stylish necklaces' },
  //           {
  //             name: 'Bracelets',
  //             description: 'Beautiful and fashionable bracelets',
  //           },
  //           { name: 'Chains', description: 'Stylish chains for a trendy look' },
  //         ],
  //       },
  //     ];
  //     for (const categoryData of categoriesData) {
  //       // eslint-disable-next-line no-await-in-loop
  //       await this.saveCategoryWithChildren(
  //         categoryData,
  //         null,
  //         this.categoryRepository,
  //       );
  //     }
  //   }
  //   private async saveCategoryWithChildren(
  //     data,
  //     parent: CategoryEntity | null,
  //     categoryRepository: Repository<CategoryEntity>,
  //   ) {
  //     const category = categoryRepository.create({
  //       name: data.name,
  //       description: data.description,
  //       parent: parent ? parent : undefined,
  //     });
  //     await categoryRepository.save(category);
  //     if (data.children) {
  //       for (const childData of data.children) {
  //         // eslint-disable-next-line no-await-in-loop
  //         await this.saveCategoryWithChildren(
  //           childData,
  //           category,
  //           categoryRepository,
  //         );
  //       }
  //     }
  //   }

  productNames = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'T-Shirts': [
      {
        name: 'Basic T-Shirt',
        gender: Gender.UNISEX,
        description: 'A basic comfortable t-shirt.',
      },
      {
        name: 'Graphic T-Shirt',
        gender: Gender.UNISEX,
        description: 'A t-shirt with a graphic print.',
      },
      {
        name: 'V-Neck T-Shirt',
        gender: Gender.UNISEX,
        description: 'A stylish v-neck t-shirt.',
      },
    ],
    "Shirts": [
      {
        name: 'Formal Shirt',
        gender: Gender.MALE,
        description: 'A formal shirt for business meetings.',
      },
      {
        name: 'Casual Shirt',
        gender: Gender.MALE,
        description: 'A casual shirt for everyday wear.',
      },
      {
        name: 'Linen Shirt',
        gender: Gender.MALE,
        description: 'A lightweight linen shirt.',
      },
    ],
    "Hoodies": [
      {
        name: 'Pullover Hoodie',
        gender: Gender.UNISEX,
        description: 'A cozy pullover hoodie.',
      },
      {
        name: 'Zip-Up Hoodie',
        gender: Gender.UNISEX,
        description: 'A comfortable zip-up hoodie.',
      },
      {
        name: 'Graphic Hoodie',
        gender: Gender.UNISEX,
        description: 'A hoodie with a graphic design.',
      },
    ],
    "Jeans": [
      {
        name: 'Skinny Jeans',
        gender: Gender.UNISEX,
        description: 'Stylish skinny jeans.',
      },
      {
        name: 'Regular Fit Jeans',
        gender: Gender.UNISEX,
        description: 'Comfortable regular fit jeans.',
      },
      {
        name: 'Distressed Jeans',
        gender: Gender.UNISEX,
        description: 'Fashionable distressed jeans.',
      },
    ],
    "Shorts": [
      {
        name: 'Cargo Shorts',
        gender: Gender.UNISEX,
        description: 'Durable cargo shorts.',
      },
      {
        name: 'Denim Shorts',
        gender: Gender.UNISEX,
        description: 'Casual denim shorts.',
      },
      {
        name: 'Athletic Shorts',
        gender: Gender.UNISEX,
        description: 'Comfortable athletic shorts.',
      },
    ],
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'High-top Shoes': [
      {
        name: 'Basketball Shoes',
        gender: Gender.UNISEX,
        description: 'High-top basketball shoes.',
      },
      {
        name: 'Hiking Boots',
        gender: Gender.UNISEX,
        description: 'Sturdy hiking boots.',
      },
      {
        name: 'Fashion Sneakers',
        gender: Gender.UNISEX,
        description: 'Stylish high-top sneakers.',
      },
    ],
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Low-top Shoes': [
      {
        name: 'Casual Sneakers',
        gender: Gender.UNISEX,
        description: 'Comfortable low-top sneakers.',
      },
      {
        name: 'Running Shoes',
        gender: Gender.UNISEX,
        description: 'Lightweight running shoes.',
      },
      {
        name: 'Slip-On Shoes',
        gender: Gender.UNISEX,
        description: 'Easy to wear slip-on shoes.',
      },
    ],
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Leather Shoes': [
      {
        name: 'Dress Shoes',
        gender: Gender.UNISEX,
        description: 'Elegant leather dress shoes.',
      },
      {
        name: 'Oxford Shoes',
        gender: Gender.UNISEX,
        description: 'Classic leather Oxford shoes.',
      },
      {
        name: 'Loafers',
        gender: Gender.UNISEX,
        description: 'Comfortable leather loafers.',
      },
    ],
    "Sneakers": [
      {
        name: 'Running Sneakers',
        gender: Gender.UNISEX,
        description: 'Performance running sneakers.',
      },
      {
        name: 'Casual Sneakers',
        gender: Gender.UNISEX,
        description: 'Versatile casual sneakers.',
      },
      {
        name: 'High-Performance Sneakers',
        gender: Gender.UNISEX,
        description: 'High-performance sneakers.',
      },
    ],
    "Necklaces": [
      {
        name: 'Gold Necklace',
        gender: Gender.UNISEX,
        description: 'Elegant gold necklace.',
      },
      {
        name: 'Silver Necklace',
        gender: Gender.UNISEX,
        description: 'Stylish silver necklace.',
      },
      {
        name: 'Pendant Necklace',
        gender: Gender.UNISEX,
        description: 'Necklace with a beautiful pendant.',
      },
    ],
    "Bracelets": [
      {
        name: 'Leather Bracelet',
        gender: Gender.UNISEX,
        description: 'Fashionable leather bracelet.',
      },
      {
        name: 'Beaded Bracelet',
        gender: Gender.UNISEX,
        description: 'Chic beaded bracelet.',
      },
      {
        name: 'Cuff Bracelet',
        gender: Gender.UNISEX,
        description: 'Stylish cuff bracelet.',
      },
    ],
    "Chains": [
      {
        name: 'Gold Chain',
        gender: Gender.UNISEX,
        description: 'Elegant gold chain.',
      },
      {
        name: 'Silver Chain',
        gender: Gender.UNISEX,
        description: 'Stylish silver chain.',
      },
      {
        name: 'Platinum Chain',
        gender: Gender.UNISEX,
        description: 'Luxurious platinum chain.',
      },
    ],
  };
  private generateProductCode(length: number): string {
    // eslint-disable-next-line no-secrets/no-secrets
    const characters =
      // eslint-disable-next-line no-secrets/no-secrets
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  private async seedProducts() {
    const categories = await this.categoryRepository.find({
      relations: ['children'],
    });
    for (const category of categories) {
      for (const subCategory of category.children) {
        const subCategoryProducts = this.productNames[subCategory.name] || [];
        for (let i = 0; i < 10; i++) {
          const productData =
            subCategoryProducts[i % subCategoryProducts.length];
          const product = this.productRepository.create({
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            product_code: this.generateProductCode(
              5 + Math.floor(Math.random() * 2),
            ),
            name: `${productData.name} ${i + 1}`,
            gender: productData.gender,
            description: productData.description,
            categories: [subCategory],
          });
          // eslint-disable-next-line no-await-in-loop
          await this.productRepository.save(product);
        }
      }
    }
  }
}
