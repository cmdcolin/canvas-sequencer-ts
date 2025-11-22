const TYPES = {
  METHOD:   'method',
  PROPERTY: 'property',
} as const;

type AtomType = typeof TYPES[keyof typeof TYPES];

class Atom {
  protected inst: string;
  protected args: any[];

  constructor(inst: string, args: any[]) {
    this.inst = inst;
    this.args = args;
  }
}

class MethodCanvasAtom extends Atom {
  type: 'method';

  constructor(inst: string, args: any[]) {
    super(inst, args);
    this.type = TYPES.METHOD;
  }

  execute(context: CanvasRenderingContext2D) {
    (context[this.inst as keyof CanvasRenderingContext2D] as any)(...this.args);
  }
}

class PropertyCanvasAtom extends Atom {
  type: 'property';

  constructor(inst: string, args: any[]) {
    super(inst, args);
    this.type = TYPES.PROPERTY;
  }

  execute(context: CanvasRenderingContext2D) {
    (context as any)[this.inst] = this.args[0];
  }
}

const atomOf = {
  [TYPES.METHOD]:   MethodCanvasAtom,
  [TYPES.PROPERTY]: PropertyCanvasAtom,
};

class CanvasAtom {
  static readonly METHOD = TYPES.METHOD;
  static readonly PROPERTY = TYPES.PROPERTY;

  constructor(type: AtomType, inst: string, args: any[]) {
    return new atomOf[type](inst, args) as any;
  }
}

export default CanvasAtom;
