/*
const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
    try {
        await database.category.createMany({
            data: [
                { name: "Computer Science"},
                { name: "Music"},
                { name: "Fitness"},
                { name: "Photography"},
                { name: "Accounting"},
                { name: "Engineering"},
                { name: "Filming"},
                { name: "Language"},
            ]
        });

        console.log("Success");
    } catch (error) {
        console.log("Error seeding the database categories", error);
    } finally {
        await database.$disconnect();
    }
}

main();
*/

const { PrismaClient } = require("@prisma/client");
const database = new PrismaClient();

async function main() {
  try {
    const categoriesData = [
      { name: "Computer Science" },
      { name: "Music" },
      { name: "Fitness" },
      { name: "Photography" },
      { name: "Business" },
      { name: "Design" },
      { name: "Filming" },
      { name: "Language" },
    ];

    const listingCategoriesData = [...categoriesData];
    /*
    await database.category.createMany({
      data: categoriesData,
    });
    */
    await database.listingCategory.createMany({
      data: listingCategoriesData,
    });

    console.log("Success");
  } catch (error) {
    console.log("Error seeding the database:", error);
  } finally {
    await database.$disconnect();
  }
}

main();

//Updating
/*
const { PrismaClient } = require("@prisma/client");
const database = new PrismaClient();

async function seedCategories() {
  try {
    const categoriesData = [
      { name: "Computer Science" },
      { name: "Music" },
      { name: "Fitness" },
      { name: "Photography" },
      { name: "Accounting" },
      { name: "Engineering" },
      { name: "Filming" },
      { name: "Language" },
    ];

    await database.category.createMany({
      data: categoriesData,
    });

    console.log("Categories seeded successfully");
  } catch (error) {
    console.log("Error seeding the database categories:", error);
  }
}

async function seedListingCategories() {
  try {
    const categoriesData = [
      { name: "Computer Science" },
      { name: "Music" },
      { name: "Fitness" },
      { name: "Photography" },
      { name: "Accounting" },
      { name: "Engineering" },
      { name: "Filming" },
      { name: "Language" },
    ];

    await database.listingCategory.createMany({
      data: categoriesData,
    });

    console.log("Listing categories seeded successfully");
  } catch (error) {
    console.log("Error seeding the database listing categories:", error);
  }
}

async function updateCategoryNames() {
  try {
    await database.category.updateMany({
      where: { name: "Computer Science" },
      data: { name: "CS" },
    });

    await database.category.updateMany({
      where: { name: "Music" },
      data: { name: "Musical Instruments" },
    });

    console.log("Category names updated successfully");
  } catch (error) {
    console.log("Error updating category names:", error);
  }
}

async function main() {
  try {
    await seedCategories();
    await seedListingCategories();
    await updateCategoryNames();
  } catch (error) {
    console.log("Error seeding the database:", error);
  } finally {
    await database.$disconnect();
  }
}

main();
*/

