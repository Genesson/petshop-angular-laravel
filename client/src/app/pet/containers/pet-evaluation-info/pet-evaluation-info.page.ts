import {Component, Input, OnInit} from '@angular/core';

import {PetSandbox} from '../../pet.sandbox';

import {EvaluationModel} from '../../../shared/models/evaluation.model';

import {PoolType} from '../../../shared/enums/pool.enum';
import {HydrationType} from '../../../shared/enums/hydration.enum';
import {PeePoopType} from '../../../shared/enums/pee-poop.enum';

@Component({
    selector: 'app-pet-evaluation-info',
    templateUrl: './pet-evaluation-info.page.html',
    styleUrls: ['./pet-evaluation-info.page.scss'],
})
export class PetEvaluationInfoPage implements OnInit {

    @Input() evaluation: EvaluationModel;

    public poolType = PoolType;

    public hydrationType = HydrationType;

    public peePoopType = PeePoopType;

    constructor(private petSandbox: PetSandbox) {
    }

    ngOnInit() {
    }

    onClickPrint() {
      window.print();
    }
}
