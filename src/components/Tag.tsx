function Tag({ name }: { name: string }) {
  return (
    <div className="w-fit rounded-xl bg-zinc-200 px-3 py-1 text-sm">{name}</div>
  );
}

export default Tag;
