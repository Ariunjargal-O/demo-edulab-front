"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ClassAdd() {
  return (
    <div className="pt-30 pb-10 px-10 flex flex-col gap-10 bg-gray-200">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold leading-8">
            Хичээл ордог ангийг нэмэх{" "}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardContent></CardContent>
      </Card>
    </div>
  );
}
