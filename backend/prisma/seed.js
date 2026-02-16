import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const severities = ["SEV1", "SEV2", "SEV3", "SEV4"];
const statuses = ["OPEN", "MITIGATED", "RESOLVED"];

async function seed() {
  for (let i = 1; i <= 200; i++) {
    await prisma.incident.create({
      data: {
        title: `Incident ${i}`,
        service: `Service ${i % 5}`,
        severity: severities[i % 4],
        status: statuses[i % 3],
        owner: `Engineer ${i % 10}`,
        summary: "Auto generated incident"
      }
    });
  }

  console.log("Database seeded");
}

seed();
