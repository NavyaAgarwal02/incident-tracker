import express from "express";
import Joi from "joi";
import { prisma } from "../db.js";

const router = express.Router();

/* Validation */
const schema = Joi.object({
  title: Joi.string().required(),
  service: Joi.string().required(),
  severity: Joi.string().valid("SEV1", "SEV2", "SEV3", "SEV4").required(),
  status: Joi.string().valid("OPEN", "MITIGATED", "RESOLVED").required(),
  owner: Joi.string().allow(""),
  summary: Joi.string().allow("")
});

/* Create Incident */
router.post("/", async (req, res) => {
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json(error.details);
  }

  const incident = await prisma.incident.create({
    data: req.body
  });

  res.json(incident);
});

/* List Incidents (Pagination + Search + Filter + Sort) */
router.get("/", async (req, res) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    severity,
    status,
    sort = "createdAt",
    order = "desc"
  } = req.query;

  const where = {
    AND: [
      search
        ? {
            OR: [
              { title: { contains: search } },
              { service: { contains: search } }
            ]
          }
        : {},
      severity ? { severity } : {},
      status ? { status } : {}
    ]
  };

  const data = await prisma.incident.findMany({
    where,
    orderBy: { [sort]: order },
    skip: (page - 1) * Number(limit),
    take: Number(limit)
  });

  const total = await prisma.incident.count({ where });

  res.json({ data, total });
});

/* Get By ID */
router.get("/:id", async (req, res) => {
  const incident = await prisma.incident.findUnique({
    where: { id: req.params.id }
  });

  res.json(incident);
});

/* Update Incident */
router.patch("/:id", async (req, res) => {
  const updated = await prisma.incident.update({
    where: { id: req.params.id },
    data: req.body
  });

  res.json(updated);
});

export default router;
