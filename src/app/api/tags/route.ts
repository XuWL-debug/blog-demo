import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/tags — 获取所有标签及文章数
export async function GET() {
  try {
    const tagCount = await prisma.postTag.groupBy({
      by: ["name"],
      _count: { name: true },
      orderBy: { _count: { name: "desc" } },
    });

    return NextResponse.json({
      tags: tagCount.map((t) => ({
        name: t.name,
        count: t._count.name,
      })),
    });
  } catch (error) {
    console.error("Get tags error:", error);
    return NextResponse.json(
      { error: "获取标签失败" },
      { status: 500 }
    );
  }
}
