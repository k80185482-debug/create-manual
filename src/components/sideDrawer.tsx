import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import Link from "next/link"

export function DrawerWithSides() {
  return (
    <div className="flex flex-wrap gap-2">
        <Drawer
          direction="right"
        >
          <DrawerTrigger asChild>
            <Button variant="outline" className=" h-11 px-5 rounded-xl font-semibold shadow-sm hover:shadow-md transition-all ml-20 bg-slate-100">
              手順書・案件の編集
            </Button>
          </DrawerTrigger>
          <DrawerContent className="w-80 ml-auto h-screen">
            <DrawerHeader>
              <DrawerTitle>手順書・案件の編集</DrawerTitle>
            </DrawerHeader>
            <div className="px-4 py-6 space-y-8">
              <Link
                href="/manage/posts/newProject"
                className="flex items-center rounded-xl border bg-white p-4 shadow-sm transition hover:shadow-md"
              >
                <div>
                  <p className="font-semibold">新規案件作成</p>
                  <p className="text-sm text-muted-foreground">
                    新しい案件を登録します
                  </p>
                </div>
              </Link>
            
              <Link
                href="/manage/posts/create"
                className="flex items-center rounded-xl border bg-white p-4 shadow-sm transition hover:shadow-md"
              >
                <div>
                  <p className="font-semibold">新規手順書作成</p>
                  <p className="text-sm text-muted-foreground">
                    手順書を新規作成します
                  </p>
                </div>
              </Link>
            
              <Link
                href="/manage/posts/revise"
                className="flex items-center rounded-xl border bg-white p-4 shadow-sm transition hover:shadow-md"
              >
                <div>
                  <p className="font-semibold">手順書の編集</p>
                  <p className="text-sm text-muted-foreground">
                    既存の手順書を編集します
                  </p>
                </div>
              </Link>
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
    </div>
  )
}
