import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// // import { RoleType } from 'src/common/constants';
// // import { UserEntity } from '@src/modules/user/entities/user.entity';
import { Repository } from 'typeorm/repository/Repository';
import { CategoryEntity } from '@src/modules/product/entities/category.entity';
import { ProductEntity } from '@src/modules/product/entities/product.entity';
import { TagsEntity } from '@src/modules/product/entities/tags.entity';
import { In } from 'typeorm';
import { ProductImageEntity } from '@src/modules/product/entities/productImage.entity';

@Injectable()
export class SeedService {
  constructor(
    // @InjectRepository(UserEntity)
    // private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(TagsEntity)
    private readonly tagsRepository: Repository<TagsEntity>,
  ) {}

  async seed(): Promise<void> {
    await Promise.all([
      //   this.seedCategories(),
      // this.seedAdmin(), this.seedUsers()
      this.seedProducts(),
    // this.seedTags(),
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

//   productNames = [
//       {
//         name: 'Sunflower Jumpsuit',
//         description:
//           // eslint-disable-next-line max-len
//           'Our products use finest materials and stunning design to create something special. Transformative colours, bold textiles and unique prints, natural fibres with high our quality craftsmanship design remains at forefront. We believe in creating unique products, so we use finest materials and stunning design to create special items.',
//         url: [
//           // eslint-disable-next-line no-secrets/no-secrets
//           'http://res.cloudinary.com/dwreut3oh/image/upload/v1720970963/mk2c4wgmwgv1pniftzha.webp',
//           'http://res.cloudinary.com/dwreut3oh/image/upload/v1720970964/nfulqeygjskz3m6acrjm.webp',
//           "http://res.cloudinary.com/dwreut3oh/image/upload/v1720970962/wie8coq2ibkjmctwspvu.webp",
//           "http://res.cloudinary.com/dwreut3oh/image/upload/v1720970965/x251ulrwg02pb0pizk4x.webp",
//           "http://res.cloudinary.com/dwreut3oh/image/upload/v1720970968/n398opmgnyo7bfkpne9m.webp"
//         ],
//       tags: ['Cream', 'Casual', 'Female'],
//       category: ['Dress'],
//       },
//       {
//         name: 'Karatima Outerwear',
//         description:
//           // eslint-disable-next-line max-len
//           'Our products use finest materials and stunning design to create something special. Transformative colours, bold textiles and unique prints, natural fibres with high our quality craftsmanship design remains at forefront. We believe in creating unique products, so we use finest materials and stunning design to create special items.',
//         url: [
//           "http://res.cloudinary.com/dwreut3oh/image/upload/v1720971222/l9cinjue7ys6iakfp5qj.webp",
//           "http://res.cloudinary.com/dwreut3oh/image/upload/v1720971222/yvwfvu2cogbqcmapwnj9.webp"
//         ],
//       tags: ['Brown', 'Casual', 'Female'],
//       category: ['Jacket'],
//         },
//       {
//         name: 'Dark Olive Short Dress',
//         description:
//           // eslint-disable-next-line max-len
//           'Our products use finest materials and stunning design to create something special. Transformative colours, bold textiles and unique prints, natural fibres with high our quality craftsmanship design remains at forefront. We believe in creating unique products, so we use finest materials and stunning design to create special items.',
//         url: [
//         'http://res.cloudinary.com/dwreut3oh/image/upload/v1720971422/z32rj3jtcgi5pvyfmgyv.webp',
//         'http://res.cloudinary.com/dwreut3oh/image/upload/v1720971417/x2zusox6dhp1wflswpru.webp',
//       ],
//       tags: ['Green', 'Female'],
//       category: ['Dress'],
//     },
//     {
//         name: 'Dust Lightweight Jacket',
//         description:
//           // eslint-disable-next-line max-len
//           'Our products use finest materials and stunning design to create something special. Transformative colours, bold textiles and unique prints, natural fibres with high our quality craftsmanship design remains at forefront. We believe in creating unique products, so we use finest materials and stunning design to create special items.',
//         url: [
//         'http://res.cloudinary.com/dwreut3oh/image/upload/v1720971589/x8yqzies2jocyblgpjpa.webp',
//         'http://res.cloudinary.com/dwreut3oh/image/upload/v1720971586/igo9rzq1qnressapmee0.webp',
//       ],
//       tags: ['Cream', 'Female'],
//       category: ['Jacket'],
//     },
//     {
//         name: 'White Dressed Pants',
//         description:
//           // eslint-disable-next-line max-len
//           'Our products use finest materials and stunning design to create something special. Transformative colours, bold textiles and unique prints, natural fibres with high our quality craftsmanship design remains at forefront. We believe in creating unique products, so we use finest materials and stunning design to create special items.',
//         url: [
//         'http://res.cloudinary.com/dwreut3oh/image/upload/v1720971699/nefqvzi2c638n6dre6ae.webp',
//         'https://res.cloudinary.com/dwreut3oh/image/upload/v1720971699/nefqvzi2c638n6dre6ae.webp',
//       ],
//       tags: ['Cream', 'Female'],
//       category: ['Pants'],
//     },
//     {
//         name: 'Leather Brown Outerwear',
//         description:
//           // eslint-disable-next-line max-len
//           'Our products use finest materials and stunning design to create something special. Transformative colours, bold textiles and unique prints, natural fibres with high our quality craftsmanship design remains at forefront. We believe in creating unique products, so we use finest materials and stunning design to create special items.',
//         url: [
//         "http://res.cloudinary.com/dwreut3oh/image/upload/v1720971883/uejhjsgiwvjgd3eqqc0c.webp",
//         "http://res.cloudinary.com/dwreut3oh/image/upload/v1720971883/zrv2jbalar1kft2n3j6r.webp",
//         "http://res.cloudinary.com/dwreut3oh/image/upload/v1720971885/n5tanz54zpjiepuweog2.webp",
//         "http://res.cloudinary.com/dwreut3oh/image/upload/v1720971884/szwlfoqdkdimcnlg8uf5.webp",
//         "http://res.cloudinary.com/dwreut3oh/image/upload/v1720971885/vvfbfdvq0blzb0xjkpjo.webp",
//       ],
//       tags: ['Brown', 'Female'],
//       category: ['Jacket'],
//     },
//     {
//         name: 'Black Tall Jacket',
//         description:
//           // eslint-disable-next-line max-len
//           'Our products use finest materials and stunning design to create something special. Transformative colours, bold textiles and unique prints, natural fibres with high our quality craftsmanship design remains at forefront. We believe in creating unique products, so we use finest materials and stunning design to create special items.',
//         url: [
//         "http://res.cloudinary.com/dwreut3oh/image/upload/v1720972060/g4bxwis4gxdhy3akp4ov.webp",
//         "http://res.cloudinary.com/dwreut3oh/image/upload/v1720972059/i3ldph2cqbxzpgw3sbla.webp",
//       ],
//       tags: ['Black', 'Female'],
//       category: ['Jacket'],
//     },
//   ];
 
//   private async seedProducts() {


//   async seedTags(): Promise<void> {
//     const tags = [
//       'White', 
//       'Cream', 
//       'Casual', 
//       'Streetwear', 
//       'Comfortable', 
//       'Winter', 
//       'Wool', 
//       'Knit', 
//       'Fall', 
//       'Women', 
//       'Female', 
//       'High Waist', 
//       'Pockets', 
//       'Elastic Waistband', 
//       'Button Closure', 
//       'Everyday', 
//       'Weekend', 
//       'Travel',
//       'Red', 
//       'Blue', 
//       'Green', 
//       'Yellow', 
//       'Black', 
//       'Gray', 
//       'Pink', 
//       'Purple', 
//       'Brown', 
//       'Orange',
//       'Black',
//     ];

//     const tagPromises = tags.map(async (tagName) => {
//       const tag = await this.tagsRepository.findOneBy({ name: tagName });
//       if (!tag) {
//         const newTag = this.tagsRepository.create({ name: tagName });
//         return this.tagsRepository.save(newTag);
//       }
//       return null;
//     });

//     await Promise.all(tagPromises);
//   }

  private async seedProducts(): Promise<void> {
    const productNames = [
      {
        name: 'Sunflower Jumpsuit',
        sku: 'SFJ001',
        description:
          // eslint-disable-next-line max-len
          'Our products use finest materials and stunning design to create something special. Transformative colours, bold textiles and unique prints, natural fibres with high our quality craftsmanship design remains at forefront. We believe in creating unique products, so we use finest materials and stunning design to create special items.',
        url: [
          // eslint-disable-next-line no-secrets/no-secrets
          'http://res.cloudinary.com/dwreut3oh/image/upload/v1720970963/mk2c4wgmwgv1pniftzha.webp',
          // eslint-disable-next-line no-secrets/no-secrets
          'http://res.cloudinary.com/dwreut3oh/image/upload/v1720970964/nfulqeygjskz3m6acrjm.webp',
          // eslint-disable-next-line no-secrets/no-secrets
          'http://res.cloudinary.com/dwreut3oh/image/upload/v1720970962/wie8coq2ibkjmctwspvu.webp',
          // eslint-disable-next-line no-secrets/no-secrets
          'http://res.cloudinary.com/dwreut3oh/image/upload/v1720970965/x251ulrwg02pb0pizk4x.webp',
          // eslint-disable-next-line no-secrets/no-secrets
          'http://res.cloudinary.com/dwreut3oh/image/upload/v1720970968/n398opmgnyo7bfkpne9m.webp',
        ],
        tags: ['Cream', 'Casual', 'Female'],
        category: ['Dress'],
      },
      {
        name: 'Karatima Outerwear',
        sku: 'KO002',
        description:
          // eslint-disable-next-line max-len
          'Our products use finest materials and stunning design to create something special. Transformative colours, bold textiles and unique prints, natural fibres with high our quality craftsmanship design remains at forefront. We believe in creating unique products, so we use finest materials and stunning design to create special items.',
        url: [
          // eslint-disable-next-line no-secrets/no-secrets
          'http://res.cloudinary.com/dwreut3oh/image/upload/v1720971222/l9cinjue7ys6iakfp5qj.webp',
          // eslint-disable-next-line no-secrets/no-secrets
          'http://res.cloudinary.com/dwreut3oh/image/upload/v1720971222/yvwfvu2cogbqcmapwnj9.webp',
        ],
        tags: ['Brown', 'Casual', 'Female'],
        category: ['Jacket'],
      },
      {
        name: 'Dark Olive Short Dress',
        sku: 'DOSD003',
        description:
          // eslint-disable-next-line max-len
          'Our products use finest materials and stunning design to create something special. Transformative colours, bold textiles and unique prints, natural fibres with high our quality craftsmanship design remains at forefront. We believe in creating unique products, so we use finest materials and stunning design to create special items.',
        url: [
          // eslint-disable-next-line no-secrets/no-secrets
          'http://res.cloudinary.com/dwreut3oh/image/upload/v1720971422/z32rj3jtcgi5pvyfmgyv.webp',
          // eslint-disable-next-line no-secrets/no-secrets
          'http://res.cloudinary.com/dwreut3oh/image/upload/v1720971417/x2zusox6dhp1wflswpru.webp',
        ],
        tags: ['Green', 'Female'],
        category: ['Dress'],
      },
      {
        name: 'Dust Lightweight Jacket',
        sku: 'DLJ004',
        description:
          // eslint-disable-next-line max-len
          'Our products use finest materials and stunning design to create something special. Transformative colours, bold textiles and unique prints, natural fibres with high our quality craftsmanship design remains at forefront. We believe in creating unique products, so we use finest materials and stunning design to create special items.',
        url: [
          // eslint-disable-next-line no-secrets/no-secrets
          'http://res.cloudinary.com/dwreut3oh/image/upload/v1720971589/x8yqzies2jocyblgpjpa.webp',
          // eslint-disable-next-line no-secrets/no-secrets
          'http://res.cloudinary.com/dwreut3oh/image/upload/v1720971586/igo9rzq1qnressapmee0.webp',
        ],
        tags: ['Cream', 'Female'],
        category: ['Jacket'],
      },
      {
        name: 'White Dressed Pants',
        sku: 'WDP005',
        description:
          // eslint-disable-next-line max-len
          'Our products use finest materials and stunning design to create something special. Transformative colours, bold textiles and unique prints, natural fibres with high our quality craftsmanship design remains at forefront. We believe in creating unique products, so we use finest materials and stunning design to create special items.',
        url: [
          // eslint-disable-next-line no-secrets/no-secrets
          'http://res.cloudinary.com/dwreut3oh/image/upload/v1720971699/nefqvzi2c638n6dre6ae.webp',
          // eslint-disable-next-line no-secrets/no-secrets
          'https://res.cloudinary.com/dwreut3oh/image/upload/v1720971699/nefqvzi2c638n6dre6ae.webp',
        ],
        tags: ['Cream', 'Female'],
        category: ['Pants'],
      },
      {
        name: 'Leather Brown Outerwear',
        sku: 'LBO006',
        description:
          // eslint-disable-next-line max-len
          'Our products use finest materials and stunning design to create something special. Transformative colours, bold textiles and unique prints, natural fibres with high our quality craftsmanship design remains at forefront. We believe in creating unique products, so we use finest materials and stunning design to create special items.',
        url: [
          // eslint-disable-next-line no-secrets/no-secrets
          'http://res.cloudinary.com/dwreut3oh/image/upload/v1720971883/uejhjsgiwvjgd3eqqc0c.webp',
          // eslint-disable-next-line no-secrets/no-secrets
          'http://res.cloudinary.com/dwreut3oh/image/upload/v1720971883/zrv2jbalar1kft2n3j6r.webp',
          // eslint-disable-next-line no-secrets/no-secrets
          'http://res.cloudinary.com/dwreut3oh/image/upload/v1720971885/n5tanz54zpjiepuweog2.webp',
          // eslint-disable-next-line no-secrets/no-secrets
          'http://res.cloudinary.com/dwreut3oh/image/upload/v1720971884/szwlfoqdkdimcnlg8uf5.webp',
          // eslint-disable-next-line no-secrets/no-secrets
          'http://res.cloudinary.com/dwreut3oh/image/upload/v1720971885/vvfbfdvq0blzb0xjkpjo.webp',
        ],
        tags: ['Brown', 'Female'],
        category: ['Jacket'],
      },
      {
        name: 'Black Tall Jacket',
        sku: 'BTJ007',
        description:
          // eslint-disable-next-line max-len
          'Our products use finest materials and stunning design to create something special. Transformative colours, bold textiles and unique prints, natural fibres with high our quality craftsmanship design remains at forefront. We believe in creating unique products, so we use finest materials and stunning design to create special items.',
        url: [
          // eslint-disable-next-line no-secrets/no-secrets
          'http://res.cloudinary.com/dwreut3oh/image/upload/v1720972060/g4bxwis4gxdhy3akp4ov.webp',
          // eslint-disable-next-line no-secrets/no-secrets
          'http://res.cloudinary.com/dwreut3oh/image/upload/v1720972059/i3ldph2cqbxzpgw3sbla.webp',
        ],
        tags: ['Black', 'Female'],
        category: ['Jacket'],
      },
    ];

    for (const productData of productNames) {
      const { name, description, url, tags, category, sku } = productData;

      // eslint-disable-next-line no-await-in-loop
      const existingProduct = await this.productRepository.findOne({
        where: [{ name }],
      });

      if (existingProduct) {
        console.log(`Product with name ${name} already exists`);
        continue;
      }

      // eslint-disable-next-line no-await-in-loop
      const categories = await this.categoryRepository.find({
        where: { name: In(category) },
      });

      if (!categories.length) {
        throw new NotFoundException('One or more categories not found');
      }

      // eslint-disable-next-line no-await-in-loop
      const tagEntities = await this.tagsRepository.find({
        where: { name: In(tags) },
      });

      if (!tagEntities.length) {
        throw new NotFoundException('One or more tags not found');
      }

      // eslint-disable-next-line no-await-in-loop
      await this.productRepository.manager.transaction(
        async (transactionalEntityManager) => {
          const product = transactionalEntityManager.create(ProductEntity, {
            sku,
            name,
            description,
            categories,
            tags: tagEntities,
          });

          const savedProduct = await transactionalEntityManager.save(product);

          const productImages = url.map((imageUrl) => {
            const image = new ProductImageEntity();
            image.url = imageUrl;
            image.product = savedProduct;
            return image;
          });

          if (productImages.length > 0) {
            await transactionalEntityManager.save(
              ProductImageEntity,
              productImages,
            );
          }
        },
      );
    }
  }
}
